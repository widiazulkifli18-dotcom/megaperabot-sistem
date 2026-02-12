#!/bin/bash
# Script untuk fix semua imports dengan versi

echo "Fixing imports with versions..."

# Daftar file UI components
FILES=(
  "accordion" "alert-dialog" "aspect-ratio" "badge" "breadcrumb" 
  "calendar" "carousel" "checkbox" "collapsible" "command" 
  "context-menu" "dialog" "dropdown-menu" "form"
  "hover-card" "input-otp" "menubar" "navigation-menu" "pagination"
  "popover" "progress" "radio-group" "resizable" "scroll-area"
  "select" "separator" "sheet" "sidebar" "slider" "switch"
  "tabs" "toggle-group" "toggle" "tooltip"
)

# Pattern replacements
# @radix-ui/react-*@version → @radix-ui/react-*
# class-variance-authority@version → class-variance-authority
# lucide-react@version → lucide-react
# react-day-picker@version → react-day-picker
# embla-carousel-react@version → embla-carousel-react
# cmdk@version → cmdk
# input-otp@version → input-otp
# react-resizable-panels@version → react-resizable-panels
# @radix-ui/react-slot@version → @radix-ui/react-slot

echo "Done!"
