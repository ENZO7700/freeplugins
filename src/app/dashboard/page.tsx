
'use client';

import { useAuth } from '@/context/auth-context';
import { useDashboard } from '@/context/dashboard-context';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { Loader2, User, Edit, Save, LogOut, Download, ShoppingBag, History, BadgeCheck, BarChart2, PieChart, Star, KeyRound, DollarSign, Package, Tag, ThumbsUp, Medal, Sparkles, Handshake, MousePointerClick, Goal, Percent } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { CategoryChart } from '@/components/dashboard/category-chart';
import { Balancer } from 'react-wrap-balancer';
import { plugins } from '@/components/plugin-list';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { LicenseKeyDialog } from '@/components/dashboard/license-key-dialog';
import { calculateAffiliatePayouts } from '@/ai/flows/calculate-affiliate-payouts';
import { getAffiliateStats, type AffiliateStatsOutput } from '@/ai/flows/get-affiliate-stats';


export default function DashboardPage() {
  const { user, loading, logout, updateUserProfile } = useAuth();
  const { purchasedPlugins, orderHistory, loading: dashboardLoading } = useDashboard();
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);
  const [displayName, setDisplayName] = React.useState(user?.displayName || '');
  const [isSaving, setIsSaving] = React.useState(false);
  
  const [affiliateStats, setAffiliateStats] = React.useState<AffiliateStatsOutput | null>(null);
  const [isAffiliateStatsLoading, setIsAffiliateStatsLoading] = React.useState(true);
  const [isCalculatingPayout, setIsCalculatingPayout] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
        setDisplayName(user.displayName || '');
        // Fetch affiliate stats
        setIsAffiliateStatsLoading(true);
        getAffiliateStats()
            .then(stats => setAffiliateStats(stats))
            .catch(err => {
                console.error("Failed to load affiliate stats", err);
                toast({ variant: "destructive", title: "Chyba", description: "Nepodarilo sa načítať partnerské štatistiky." });
            })
            .finally(() => setIsAffiliateStatsLoading(false));
    }
  }, [user, loading, router, toast]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
        await updateUserProfile({ displayName: displayName });
        toast({ title: "Profil aktualizovaný", description: "Vaše zobrazované meno bolo aktualizované." });
        setIsEditing(false);
    } catch (error: any) {
        toast({ variant: "destructive", title: "Aktualizácia zlyhala", description: error.message });
    } finally {
        setIsSaving(false);
    }
  };

  const handleCalculatePayouts = async () => {
    setIsCalculatingPayout(true);
    toast({
        title: "Spracovávam...",
        description: "Simulujem mesačný výpočet provízií. Prosím, počkajte.",
    });
    try {
        const result = await calculateAffiliatePayouts();
        toast({
            title: "Výpočet dokončený!",
            description: `Boli vypočítané provízie za ${result.reportPeriod} v celkovej výške $${result.totalPayoutAmount.toFixed(2)} pre ${result.numberOfAffiliates} partnerov.`,
        });
    } catch (error) {
        console.error("Error calculating affiliate payouts:", error);
        toast({
            variant: "destructive",
            title: "Výpočet zlyhal",
            description: "Vyskytla sa chyba pri simulácii výpočtu.",
        });
    } finally {
        setIsCalculatingPayout(false);
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
              <Balancer>Vitajte späť, {user.displayName || user.email}!</Balancer>
            </h1>
             <Button onClick={logout} variant="outline" className='w-full sm:w-auto'>
                <LogOut className="mr-2 h-4 w-4" />
                Odhlásiť sa
              </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Celková útrata</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Zakúpené pluginy</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{purchasedPlugins.length}</div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Obľúbená kategória</CardTitle>
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
                                <CardTitle>Mesačné výdavky</CardTitle>
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
                                    <CardTitle>Pluginy podľa kategórie</CardTitle>
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
                    <CardTitle>Moje zakúpené pluginy</CardTitle>
                  </div>
                  <CardDescription>Všetky vaše úžasné pluginy na jednom mieste.</CardDescription>
                </CardHeader>
                <CardContent>
                  {purchasedPlugins.length > 0 ? (
                    <ul className="space-y-4">
                      {purchasedPlugins.map(plugin => (
                        <li key={plugin.slug} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-secondary/50 rounded-lg gap-4">
                          <div className='flex items-center gap-4'>
                            {plugin.imageUrl && (
                                <Image src={plugin.imageUrl} alt={plugin.name} width={40} height={40} className='rounded-md' data-ai-hint={plugin.dataAiHint}/>
                            )}
                            <div>
                                <p className="font-semibold">{plugin.name}</p>
                                <p className="text-sm text-muted-foreground">{plugin.category}</p>
                            </div>
                          </div>
                          <div className='flex gap-2 self-end sm:self-center'>
                             <LicenseKeyDialog 
                                pluginId={plugin.slug}
                                userId={user.uid}
                                trigger={
                                    <Button size="sm" variant="ghost"><KeyRound className="mr-2 h-4 w-4" /> Spravovať licenciu</Button>
                                }
                             />
                             <Button size="sm" variant="outline"><Download className="mr-2 h-4 w-4" /> Stiahnuť</Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">Zatiaľ ste si nekúpili žiadne pluginy.</p>
                       <Button asChild>
                         <Link href="/">Preskúmať trhovisko</Link>
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
                        <CardTitle>Odporúčané pre vás</CardTitle>
                      </div>
                      <CardDescription>Na základe vašej histórie nákupov by sa vám mohli páčiť tieto!</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recommendedPlugins.map(plugin => (
                           <Link key={plugin.slug} href={`/plugins/${plugin.slug}`} className='group'>
                             <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                                <div className='relative h-32 w-full'>
                                  {plugin.imageUrl && (
                                    <Image src={plugin.imageUrl} alt={plugin.name} fill style={{objectFit: 'cover'}} data-ai-hint={plugin.dataAiHint} />
                                  )}
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
                            <CardTitle>Môj profil</CardTitle>
                        </div>
                        <CardDescription>Spravujte podrobnosti svojho účtu.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">E-mailová adresa</Label>
                                <Input id="email" type="email" value={user.email || ''} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Zobrazované meno</Label>
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
                                        Uložiť
                                    </Button>
                                    <Button variant="outline" onClick={() => {
                                      setIsEditing(false);
                                      setDisplayName(user.displayName || '');
                                    }}>Zrušiť</Button>
                                </div>
                            )}
                        </form>
                         <Separator className="my-6" />
                        <p className="text-xs text-muted-foreground">
                            ID používateľa: <code className="bg-muted p-1 rounded-sm">{user.uid}</code>
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <div className='flex items-center gap-2'>
                            <Handshake className="h-6 w-6" />
                            <CardTitle>Partnerský Panel</CardTitle>
                        </div>
                        <CardDescription>Prehľad vašich simulovaných partnerských aktivít.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isAffiliateStatsLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        ) : affiliateStats ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex flex-col space-y-1 p-3 bg-muted rounded-md">
                                        <div className="flex items-center gap-2 text-muted-foreground"><MousePointerClick /><span>Kliknutia</span></div>
                                        <p className="text-2xl font-bold">{affiliateStats.clicks}</p>
                                    </div>
                                    <div className="flex flex-col space-y-1 p-3 bg-muted rounded-md">
                                        <div className="flex items-center gap-2 text-muted-foreground"><Goal/><span>Konverzie</span></div>
                                        <p className="text-2xl font-bold">{affiliateStats.conversions}</p>
                                    </div>
                                     <div className="flex flex-col space-y-1 p-3 bg-muted rounded-md">
                                        <div className="flex items-center gap-2 text-muted-foreground"><Percent/><span>Miera konverzie</span></div>
                                        <p className="text-2xl font-bold">{affiliateStats.conversionRate}%</p>
                                    </div>
                                    <div className="flex flex-col space-y-1 p-3 bg-muted rounded-md">
                                        <div className="flex items-center gap-2 text-muted-foreground"><DollarSign/><span>Celkové zárobky</span></div>
                                        <p className="text-2xl font-bold">${affiliateStats.totalEarnings.toFixed(2)}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground italic text-center pt-2">Tieto dáta sú len na demonštračné účely.</p>
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center">Partnerské štatistiky sa nepodarilo načítať.</p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handleCalculatePayouts} disabled={isCalculatingPayout}>
                            {isCalculatingPayout && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Simulovať Mesačnú Uzávierku
                        </Button>
                    </CardFooter>
                </Card>

                 {getBadges.length > 0 && (
                  <Card>
                      <CardHeader>
                          <div className='flex items-center gap-2'>
                              <BadgeCheck className="h-6 w-6" />
                              <CardTitle>Moje odznaky</CardTitle>
                          </div>
                          <CardDescription>Vaše úspechy na našej platforme.</CardDescription>
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
