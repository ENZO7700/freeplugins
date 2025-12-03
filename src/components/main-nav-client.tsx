"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger
} from "@/components/ui/sidebar"
import {
  BookOpen,
  Users,
  Mail,
  ShoppingBag,
  ChevronDown
} from "lucide-react"
import { getPluginCategories } from "./plugin-list"
import { cn } from "@/lib/utils"

export function MainNavClient() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const { isMobile, setOpenMobile, state } = useSidebar()
  
  // Start with marketplace open by default if we are on a marketplace page
  const isMarketplacePage = pathname === '/' || pathname.startsWith('/plugins/');
  const [isMarketplaceOpen, setIsMarketplaceOpen] = React.useState(isMarketplacePage);

  const categories = getPluginCategories()

  const isActive = (path: string) => {
    return pathname === path
  }

  const isMarketplaceActive = (categoryName?: string) => {
    if (!categoryName) {
      return pathname === '/' && !categoryParam
    }
    return pathname === '/' && categoryParam === categoryName
  }
  
  React.useEffect(() => {
    if(isMarketplacePage) {
        setIsMarketplaceOpen(true);
    }
  }, [pathname, categoryParam, isMarketplacePage])


  const handleClose = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <>
      <SidebarHeader>
        <Link href="/" passHref>
          <div className={cn(
            "text-2xl font-bold font-headline text-primary cursor-pointer hover:animate-text-glow p-2 transition-opacity duration-300",
            state === 'collapsed' ? 'opacity-0' : 'opacity-100'
            )}>
            FreePlugins
          </div>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent className="p-0">
        <SidebarMenu>

          {/* Marketplace Group */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setIsMarketplaceOpen(!isMarketplaceOpen)}
              className="justify-between"
              isActive={isMarketplacePage}
              tooltip="Trhovisko"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag />
                <span>Trhovisko</span>
              </div>
              <ChevronDown className={`transition-transform duration-200 ${isMarketplaceOpen ? 'rotate-180' : ''}`} />
            </SidebarMenuButton>
            {isMarketplaceOpen && (
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <Link href="/" onClick={handleClose}>
                    <SidebarMenuSubButton isActive={isMarketplaceActive()}>
                       Všetky pluginy
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                {categories.map((category) => (
                    <SidebarMenuSubItem key={category.name}>
                        <Link href={`/?category=${encodeURIComponent(category.name)}`} onClick={handleClose}>
                            <SidebarMenuSubButton isActive={isMarketplaceActive(category.name)}>
                                {category.name}
                            </SidebarMenuSubButton>
                        </Link>
                    </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/blog" onClick={handleClose}>
              <SidebarMenuButton tooltip="Blog" isActive={isActive('/blog')}>
                <BookOpen />
                <span>Blog</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/about" onClick={handleClose}>
              <SidebarMenuButton tooltip="O nás" isActive={isActive('/about')}>
                <Users />
                <span>O nás</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/contact" onClick={handleClose}>
              <SidebarMenuButton tooltip="Kontakt" isActive={isActive('/contact')}>
                <Mail />
                <span>Kontakt</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <p className={cn(
          "text-xs text-muted-foreground p-2 text-center transition-opacity duration-300",
          state === 'collapsed' ? 'opacity-0' : 'opacity-100'
        )}>&copy; {new Date().getFullYear()} FreePlugins</p>
      </SidebarFooter>
    </>
  )
}