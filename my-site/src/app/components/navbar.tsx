import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  Navbar as HeroNavbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from '@heroui/react';
import { ThemeSwitcher } from './theme-switch';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <HeroNavbar 
      isBordered 
      isBlurred
      className="bg-background/70 backdrop-blur-md"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link as={RouterLink} to="/" className="font-bold text-inherit flex items-center gap-2">
            <Icon icon="lucide:code" width={24} height={24} className="text-primary" />
            <span className="text-foreground">Portfolio</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-9" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.path} isActive={isActive(item.path)}>
            <Link 
              as={RouterLink} 
              to={item.path} 
              color={isActive(item.path) ? "primary" : "foreground"}
              className="relative"
            >
              {item.name}
              {isActive(item.path) && (
                <motion.div 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button 
            as={RouterLink}
            to="/contact" 
            color="primary" 
            variant="flat"
            radius="full"
            startContent={<Icon icon="lucide:mail" />}
          >
            Contact Me
          </Button>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarMenu className="pt-6">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <Link
              as={RouterLink}
              to={item.path}
              color={isActive(item.path) ? "primary" : "foreground"}
              className="w-full py-2"
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
};