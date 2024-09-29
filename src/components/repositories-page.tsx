"use client";

import { GithubRepoCard } from "@/components/github-repo-card";
import { useGetRepoList } from "@/services";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { GetUserRepo } from "@/types/get-user-repo";

export const RepositoriesPage = () => {
  const { data: allRepos } = useGetRepoList();
  const [visibleRepos, setVisibleRepos] = useState<GetUserRepo[]>([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef(null);
  const itemsPerPage = 6;


  const loadMoreRepos = useCallback(() => {
    if (allRepos && visibleRepos.length < allRepos.length) {
      const nextPage = page + 1;
      const newVisibleRepos = allRepos.slice(0, nextPage * itemsPerPage);
      setVisibleRepos(newVisibleRepos);
      setPage(nextPage);
    }
  }, [allRepos, visibleRepos, page, itemsPerPage, setVisibleRepos, setPage]);

  useEffect(() => {
    if (allRepos) {
      
      setVisibleRepos(allRepos.slice(0, itemsPerPage));
    }
  }, [allRepos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          loadMoreRepos();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      const currentObserverRef = observerRef.current;
      if (currentObserverRef) {
        observer.observe(currentObserverRef);
      }

      return () => {
        if (currentObserverRef) {
          observer.unobserve(currentObserverRef);
        }
      };
    }
  }, [visibleRepos, loadMoreRepos]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visibleRepos.map((repo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * index, duration: 0.5 }}
        >
          <GithubRepoCard repo={repo} />
        </motion.div>
      ))}

      <div ref={observerRef} className="h-10 w-full"></div>
    </div>
  );
};
