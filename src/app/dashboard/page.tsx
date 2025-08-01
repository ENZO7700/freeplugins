
'use client';

import { useAuth } from '@/context/auth-context';
import { useDashboard } from '@/context/dashboard-context';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { Loader2, User, Edit, Save, LogOut, Download, ShoppingBag, History, BadgeCheck, BarChart2, PieChart, Star, KeyRound, DollarSign, Package, Tag, ThumbsUp, Medal, Sparkles  } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { CategoryChart } from '@/components/dashboard/category-chart';
import { Balancer } from 'react-wrap-balancer';
import { plugins, Plugin } from '@/components/plugin-list';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';


export default function DashboardPage() {
  const { user, loading, logout, updateUserProfile } = useAuth();
  const { purchasedPlugins, orderHistory, loading: dashboardLoading } = useDashboard();
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);
  const [displayName, setDisplayName] = React.useState(user?.displayName || '');
  const [isSaving, setIsSaving] = React.useState(false);
  
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
        setDisplayName(user.displayName || '');
    }
  }, [user, loading, router]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
        await updateUserProfile({ displayName: displayName });
        toast({ title: "Profile Updated", description: "Your display name has been updated." });
        setIsEditing(false);
    } catch (error: any) {
        toast({ variant: "destructive", title: "Update Failed", description: error.message });
    } finally {
        setIsSaving(false);
    }
  };

  const totalSpent = orderHistory.reduce((acc, order) => acc + order.total, 0);
  const favoriteCategory = React.useMemo(() => {
    if (purchasedPlugins.length === 0) return 'N/A';
    const categoryCounts = purchasedPlugins.reduce((acc, plugin) => {
      acc[plugin.category] = (acc[plugin.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b);
  }, [purchasedPlugins]);

  const recommendedPlugins = React.useMemo(() => {
    if (purchasedPlugins.length === 0) {
      return plugins.sort((a,b) => b.rating - a.rating).slice(0, 3);
    }
    const purchasedSlugs = new Set(purchasedPlugins.map(p => p.slug));
    return plugins
      .filter(p => !purchasedSlugs.has(p.slug) && (p.category === favoriteCategory || favoriteCategory === 'N/A'))
      .slice(0, 3);
  }, [purchasedPlugins, favoriteCategory]);
  
  const getBadges = React.useMemo(() => {
    const badges = [];
    if(orderHistory.length > 0) badges.push({icon: ThumbsUp, label: 'Prvý nákup', color: 'text-green-500'});
    if(orderHistory.length >= 3) badges.push({icon: Medal, label: 'Verný zákazník', color: 'text-yellow-500'});
    if(favoriteCategory !== 'N/A') badges.push({icon: Star, label: `${favoriteCategory} špecialista`, color: 'text-blue-500' });
    return badges;
  }, [orderHistory, favoriteCategory]);


  if (loading || !user || dashboardLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <PageTransitionWrapper>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <h1 className="text-3xl font-bold font-headline">
              <Balancer>Welcome back, {user.displayName || user.email}!</Balancer>
            </h1>
             <Button onClick={logout} variant="outline" className='w-full sm:w-auto'>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Plugins Purchased</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{purchasedPlugins.length}</div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favorite Category</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{favoriteCategory}</div>
              </CardContent>
            </Card>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {orderHistory.length > 0 && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <Card>
                             <CardHeader>
                                <div className="flex items-center gap-2">
                                <BarChart2 className="h-6 w-6" />
                                <CardTitle>Monthly Spending</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <SpendingChart data={orderHistory} />
                            </CardContent>
                        </Card>
                         <Card>
                             <CardHeader>
                                 <div className="flex items-center gap-2">
                                    <PieChart className="h-6 w-6" />
                                    <CardTitle>Plugins by Category</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CategoryChart data={purchasedPlugins} />
                            </CardContent>
                        </Card>
                    </div>
                )}
            
              <Card>
                <CardHeader>
                  <div className='flex items-center gap-2'>
                    <ShoppingBag className="h-6 w-6" />
                    <CardTitle>My Purchased Plugins</CardTitle>
                  </div>
                  <CardDescription>All your awesome plugins in one place.</CardDescription>
                </CardHeader>
                <CardContent>
                  {purchasedPlugins.length > 0 ? (
                    <ul className="space-y-4">
                      {purchasedPlugins.map(plugin => (
                        <li key={plugin.slug} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-secondary/50 rounded-lg gap-4">
                          <div className='flex items-center gap-4'>
                            <Image src={plugin.imageUrl} alt={plugin.name} width={40} height={40} className='rounded-md' data-ai-hint={plugin.dataAiHint}/>
                            <div>
                                <p className="font-semibold">{plugin.name}</p>
                                <p className="text-sm text-muted-foreground">{plugin.category}</p>
                            </div>
                          </div>
                          <div className='flex gap-2 self-end sm:self-center'>
                             <Button size="sm" variant="ghost"><KeyRound className="mr-2 h-4 w-4" /> Manage License</Button>
                             <Button size="sm" variant="outline"><Download className="mr-2 h-4 w-4" /> Download</Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">You haven't purchased any plugins yet.</p>
                       <Button asChild>
                         <Link href="/">Explore Marketplace</Link>
                       </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {recommendedPlugins.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className='flex items-center gap-2'>
                        <Sparkles className="h-6 w-6 text-primary" />
                        <CardTitle>Recommended For You</CardTitle>
                      </div>
                      <CardDescription>Based on your purchase history, you might like these!</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recommendedPlugins.map(plugin => (
                           <Link key={plugin.slug} href={`/plugins/${plugin.slug}`} className='group'>
                             <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                                <div className='relative h-32 w-full'>
                                  <Image src={plugin.imageUrl} alt={plugin.name} fill style={{objectFit: 'cover'}} data-ai-hint={plugin.dataAiHint} />
                                </div>
                                <div className="p-4">
                                  <p className="font-semibold text-sm group-hover:underline">{plugin.name}</p>
                                  <Badge variant="outline" className="mt-1">{plugin.category}</Badge>
                                </div>
                             </Card>
                           </Link>
                        ))}
                    </CardContent>
                  </Card>
              )}
            </div>

            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <div className='flex items-center gap-2'>
                            <User className="h-6 w-6" />
                            <CardTitle>My Profile</CardTitle>
                        </div>
                        <CardDescription>Manage your account details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" value={user.email || ''} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Display Name</Label>
                                <div className="flex items-center gap-2">
                                    <Input 
                                        id="displayName" 
                                        value={displayName} 
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        disabled={!isEditing}
                                    />
                                    {!isEditing && (
                                        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                                            <Edit className="h-4 w-4"/>
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {isEditing && (
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={isSaving}>
                                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                        Save
                                    </Button>
                                    <Button variant="outline" onClick={() => {
                                      setIsEditing(false);
                                      setDisplayName(user.displayName || '');
                                    }}>Cancel</Button>
                                </div>
                            )}
                        </form>
                         <Separator className="my-6" />
                        <p className="text-xs text-muted-foreground">
                            User ID: <code className="bg-muted p-1 rounded-sm">{user.uid}</code>
                        </p>
                    </CardContent>
                </Card>

                 {getBadges.length > 0 && (
                  <Card>
                      <CardHeader>
                          <div className='flex items-center gap-2'>
                              <BadgeCheck className="h-6 w-6" />
                              <CardTitle>My Badges</CardTitle>
                          </div>
                          <CardDescription>Your achievements on our platform.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          {getBadges.map(badge => {
                            const Icon = badge.icon;
                            return (
                               <div key={badge.label} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                                 <Icon className={`h-8 w-8 ${badge.color}`} />
                                 <p className='font-medium'>{badge.label}</p>
                               </div>
                            )
                          })}
                      </CardContent>
                  </Card>
                 )}
            </div>
          </div>
        </div>
      </main>
    </PageTransitionWrapper>
  );
}
