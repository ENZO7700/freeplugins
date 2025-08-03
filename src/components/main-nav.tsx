
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"
import {
  Home,
  BookOpen,
  Users,
  Mail,
  ShoppingBag,
  ChevronDown
} from "lucide-react"
import { Button } from "./ui/button"
import { getPluginCategories } from "./plugin-list"

export function MainNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const { isMobile, setOpen } = useSidebar()
  const [isMarketplaceOpen, setIsMarketplaceOpen] = React.useState(true);

  const categories = getPluginCategories()

  const isActive = (path: string) => {
    return pathname === path
  }

  const isMarketplaceActive = (categoryName?: string) => {
    if (!categoryName) {
      return (pathname === '/') && !categoryParam
    }
    return categoryParam === categoryName
  }

  const handleClose = () => {
    if (isMobile) {
      setOpen(false)
    }
  }

  return (
    <>
      <SidebarHeader>
        <Link href="/" passHref>
          <div className="text-2xl font-bold font-headline text-primary cursor-pointer hover:animate-text-glow p-2">
            SOFTW4R3
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <SidebarMenu>

          {/* Marketplace Group */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setIsMarketplaceOpen(!isMarketplaceOpen)}
              className="justify-between"
              isActive={pathname === '/' || pathname.startsWith('/plugins/')}
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
                  <Link href="/" onClick={handleClose} passHref>
                    <SidebarMenuSubButton asChild isActive={isMarketplaceActive()}>
                      Všetky pluginy
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                {categories.map((category) => (
                    <SidebarMenuSubItem key={category.name}>
                        <Link href={`/?category=${encodeURIComponent(category.name)}`} onClick={handleClose} passHref>
                            <SidebarMenuSubButton asChild isActive={isMarketplaceActive(category.name)}>
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
        <p className="text-xs text-muted-foreground p-2">&copy; {new Date().getFullYear()} SOFTW4R3</p>
      </SidebarFooter>
    </>
  )
}
