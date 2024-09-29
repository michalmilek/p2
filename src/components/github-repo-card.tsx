"use client"

import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarIcon, GitForkIcon, EyeIcon, BookIcon } from "lucide-react"
import { GetUserRepo } from "@/types/get-user-repo"

interface GitHubRepoProps {
  repo: GetUserRepo
}

export function GithubRepoCard({ repo }: GitHubRepoProps) {
  return (
    <Card className="bg-[#2a2a2a] border-[#d4af37]/20 overflow-hidden group transition-all duration-300 hover:border-[#d4af37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
      <CardHeader className="pb-2">
        <CardTitle className="font-cinzel text-[#d4af37] flex items-center space-x-2">
          <BookIcon size={20} />
          <span>{repo.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-[#f0e68c] text-sm mb-4">{repo.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.map((topic) => (
            <Badge key={topic} variant="secondary" className="bg-[#3a3a3a] text-[#d4af37] hover:bg-[#4a4a4a]">
              {topic}
            </Badge>
          ))}
        </div>
        {repo.language && (
          <div className="text-sm text-[#f0e68c] mb-2">
            <span className="inline-block w-3 h-3 rounded-full bg-[#d4af37] mr-2"></span>
            {repo.language}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t border-[#d4af37]/20">
        <div className="flex space-x-4">
          <span className="flex items-center text-[#f0e68c] text-sm">
            <StarIcon size={16} className="mr-1" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center text-[#f0e68c] text-sm">
            <GitForkIcon size={16} className="mr-1" />
            {repo.forks_count}
          </span>
          <span className="flex items-center text-[#f0e68c] text-sm">
            <EyeIcon size={16} className="mr-1" />
            {repo.watchers_count}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#d4af37] border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2a2a2a]"
          asChild
        >
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View Repo</a>
        </Button>
      </CardFooter>
    </Card>
  )
}