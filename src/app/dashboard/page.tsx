
'use client';

import { useAuth } from '@/context/auth-context';
import { useDashboard } from '@/context/dashboard-context';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { Loader2, User, ShoppingBag, History, Download, Edit, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

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
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
             <h1 className="text-3xl font-bold font-headline">Welcome, {user.displayName || user.email}!</h1>
             <Button onClick={logout} variant="outline">
                Log Out
              </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
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
                        <li key={plugin.slug} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                          <div>
                            <p className="font-semibold">{plugin.name}</p>
                            <p className="text-sm text-muted-foreground">{plugin.category}</p>
                          </div>
                          <Button size="sm" variant="outline"><Download className="mr-2 h-4 w-4" /> Download</Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">You haven't purchased any plugins yet.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                   <div className='flex items-center gap-2'>
                    <History className="h-6 w-6" />
                    <CardTitle>Order History</CardTitle>
                  </div>
                  <CardDescription>Review your past transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                    {orderHistory.length > 0 ? (
                      <ul className="space-y-4">
                        {orderHistory.map(order => (
                          <li key={order.id} className="p-3 bg-secondary/50 rounded-lg space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            <Separator/>
                            <p>Total: <span className="font-bold">${order.total.toFixed(2)}</span></p>
                            <p className="text-sm text-muted-foreground">Items: {order.items.map(item => item.name).join(', ')}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                       <p className="text-muted-foreground">No orders found.</p>
                    )}
                </CardContent>
              </Card>
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
                                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                </div>
                            )}
                        </form>
                         <Separator className="my-6" />
                        <p className="text-xs text-muted-foreground">
                            User ID: <code className="bg-muted p-1 rounded-sm">{user.uid}</code>
                        </p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
    </PageTransitionWrapper>
  );
}
