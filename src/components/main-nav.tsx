
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
  SidebarMenuSubItem
} from "@/components/ui/sidebar"
import {
  BookOpen,
  Users,
  Mail,
  ShoppingBag,
  ChevronDown
} from "lucide-react"
import { getPluginCategories } from "./plugin-list"

export function MainNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const { isMobile, setOpenMobile } = useSidebar()
  const [isMarketplaceOpen, setIsMarketplaceOpen] = React.useState(true);

  const categories = getPluginCategories()

  const isActive = (path: string) => {
    return pathname === path
  }

  const isMarketplaceActive = (categoryName?: string) => {
    const isMarketplacePage = pathname === '/' && !searchParams.get('category');
    if (!categoryName) {
      return isMarketplacePage && !categoryParam
    }
    return pathname === '/' && categoryParam === categoryName
  }

  const handleClose = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <>
      <SidebarHeader>
        <Link href="/" passHref>
          <div className="text-2xl font-bold font-headline text-primary cursor-pointer hover:animate-text-glow p-2">
            Expresívny Navigátor
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
        <p className="text-xs text-muted-foreground p-2 text-center">&copy; {new Date().getFullYear()} Expresívny Navigátor</p>
      </SidebarFooter>
    </>
  )
}
