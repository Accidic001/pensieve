
'use client';

import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';
import paths from '@/paths';

interface SearchResult {
  posts: { id: string; title: string }[];
  topics: { slug: string }[];
}

export function SearchInput() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchResults = async (query: string) => {
    if (query.length > 2) {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSearchResults(data);
      setOpen(true);
    } else {
      setSearchResults(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(paths.search(searchQuery));
      setOpen(false);
      setSearchQuery('');
      inputRef.current?.blur();
    }
  };

  const handleResultSelect = (type: 'post' | 'topic', id: string) => {
    const path = type === 'post' 
      ? paths.postShow('topic-slug', id)
      : paths.showTopics(id);
    router.push(path);
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="w-full max-w-md">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search posts and topics..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  fetchResults(e.target.value);
                }}
                onFocus={() => searchQuery.length > 0 && setOpen(true)}
              />
              {searchQuery && (
                <X
                  className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-muted-foreground"
                  onClick={() => {
                    setSearchQuery('');
                    setOpen(false);
                  }}
                />
              )}
            </div>
          </form>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <CommandList>
              {!searchResults ? (
                <CommandEmpty>Type to search...</CommandEmpty>
              ) : searchResults.posts.length === 0 && searchResults.topics.length === 0 ? (
                <CommandEmpty>No results found</CommandEmpty>
              ) : (
                <>
                  {searchResults.posts.length > 0 && (
                    <CommandGroup heading="Posts">
                      {searchResults.posts.map((post) => (
                        <CommandItem
                          key={post.id}
                          onSelect={() => handleResultSelect('post', post.id)}
                          className="cursor-pointer"
                        >
                          {post.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  {searchResults.topics.length > 0 && (
                    <CommandGroup heading="Topics">
                      {searchResults.topics.map((topic) => (
                        <CommandItem
                          key={topic.slug}
                          onSelect={() => handleResultSelect('topic', topic.slug)}
                          className="cursor-pointer"
                        >
                          {topic.slug}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}