'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  GraduationCap, 
  FolderKanban, 
  Trophy, 
  MessageCircle,
  Palette,
  Droplet,
  Feather,
  User
} from 'lucide-react'
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/shadcn-components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/shadcn-components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "~/shadcn-components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/shadcn-components/ui/tooltip"
import { Medium, Genre, Skill, GenreOptions, SkillOptions } from '~/types';

import { RouteParams } from '~/types'

const mediumOptions: Medium[] = [Medium.Music, Medium.Writing, Medium.Acting];

const genreOptions: GenreOptions = {
    [Medium.Music]: [Genre.IndieRock, Genre.Metal, Genre.Country, Genre.HipHop, Genre.Jazz],
    [Medium.Writing]: [Genre.Screenwriting, Genre.Poetry, Genre.Novels, Genre.ShortStories],
    [Medium.Acting]: [Genre.StageActing, Genre.ScreenActing, Genre.MethodActing, Genre.Improv],
  }
  
  const skillOptions: SkillOptions = {
    [Medium.Music]: [Skill.Production, Skill.Guitar, Skill.Bass, Skill.Drums, Skill.Piano, Skill.Saxophone],
    [Medium.Writing]: [Skill.Dialogue, Skill.StoryStructure, Skill.Prose, Skill.Characters, Skill.Comedy, Skill.Romance],
    [Medium.Acting]: [Skill.Humor, Skill.Drama, Skill.Physicality, Skill.ActingDialogue],
  }

export default function TopNavBar() {
const [selectedMedium, setSelectedMedium] = useState<Medium>(Medium.Music);
const [selectedGenre, setSelectedGenre] = useState<Genre | ''>('');
const [selectedSkill, setSelectedSkill] = useState<Skill | ''>('');
  const router = useRouter()

  const handleNavigation = (path: string) => {
    if (selectedMedium && selectedGenre && selectedSkill) {
      router.push(`/${selectedMedium.toLowerCase()}/${selectedGenre.toLowerCase().replace(' ', '-')}/${selectedSkill.toLowerCase().replace(' ', '-')}/${path}`)
    } else {
      alert('Please select a Medium, Genre, and Skill before navigating.')
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavigationMenuItem>
                    <button onClick={() => handleNavigation('feedback')} className={navigationMenuTriggerStyle()}>
                      <GraduationCap className="h-4 w-4" />
                    </button>
                  </NavigationMenuItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Feedback</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavigationMenuItem>
                    <button onClick={() => handleNavigation('projects')} className={navigationMenuTriggerStyle()}>
                      <FolderKanban className="h-4 w-4" />
                    </button>
                  </NavigationMenuItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Projects</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavigationMenuItem>
                    <button onClick={() => handleNavigation('league')} className={navigationMenuTriggerStyle()}>
                      <Trophy className="h-4 w-4" />
                    </button>
                  </NavigationMenuItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>League</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavigationMenuItem>
                    <button onClick={() => handleNavigation('messages')} className={navigationMenuTriggerStyle()}>
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </NavigationMenuItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Messages</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex-1" />

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Palette className="h-4 w-4" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="p-4 w-max">
                    {mediumOptions.map((medium) => (
                    <li key={medium}>
                        <NavigationMenuLink asChild>
                        <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            onClick={() => {
                            setSelectedMedium(medium);
                            setSelectedGenre('');
                            setSelectedSkill('');
                            }}
                        >
                            <div className="text-sm font-medium leading-none">{medium}</div>
                        </a>
                        </NavigationMenuLink>
                    </li>
                    ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Droplet className="h-4 w-4" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="p-4 w-max">
                  {genreOptions[selectedMedium].map((genre) => (
                    <li key={genre}>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          onClick={() => setSelectedGenre(genre)}
                        >
                          <div className="text-sm font-medium leading-none">{genre}</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Feather className="h-4 w-4" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="p-4 w-max">
                  {skillOptions[selectedMedium].map((skill) => (
                    <li key={skill}>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          onClick={() => setSelectedSkill(skill)}
                        >
                          <div className="text-sm font-medium leading-none">{skill}</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigation('profile')}>My Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation('settings')}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigation('signout')}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}