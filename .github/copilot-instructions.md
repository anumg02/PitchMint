# GitHub Copilot Instructions for PitchMint

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
PitchMint is a full-stack startup-investor networking platform (virtual Shark Tank) built with:
- **Frontend**: Next.js 14+ with TypeScript and Tailwind CSS
- **Backend**: Next.js API routes with PostgreSQL
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Video**: Agora.io for live pitch events
- **Payments**: Stripe for subscriptions

## Code Style Guidelines
- Use TypeScript with strict mode enabled
- Follow Next.js 14+ App Router conventions
- Use Tailwind CSS for all styling with custom design system
- Implement responsive design (mobile-first approach)
- Use modern React patterns (hooks, functional components)
- Apply proper error handling and loading states

## Design System
- **Primary**: #1E40AF (Professional Blue) - Headers, logo, main branding
- **Secondary**: #DC2626 (Action Red) - CTA buttons, highlights  
- **Accent**: #7C3AED (Innovation Purple) - Charts, icons, visual interest
- **Background**: #F8FAFC (Light Gray) - Main background
- **Surface**: #FFFFFF (White) - Cards, modals, containers
- **Text**: #1F2937 (Dark Gray) - Primary text with high contrast

## Architecture Patterns
- Use server components where possible for better performance
- Implement proper data fetching with Next.js patterns
- Apply clean architecture with separation of concerns
- Use custom hooks for complex state management
- Implement proper TypeScript interfaces for all data structures

## Security & Best Practices
- Validate all inputs on both client and server side
- Use environment variables for sensitive configuration
- Implement proper authentication and authorization
- Apply rate limiting for API endpoints
- Use proper error handling and logging
