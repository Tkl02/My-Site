import React from 'react';
import { useTheme } from '@heroui/use-theme';
import { Switch, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  
  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };
  
  return (
    <Tooltip 
      content={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      placement="bottom"
    >
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Switch
            isSelected={isDark}
            onValueChange={handleToggle}
            size="sm"
            color="primary"
            startContent={<Icon icon="lucide:sun" className={`text-default-500 ${!isDark && 'text-primary-500'}`} />}
            endContent={<Icon icon="lucide:moon" className={`text-default-500 ${isDark && 'text-primary-500'}`} />}
          />
        </motion.div>
      </div>
    </Tooltip>
  );
};