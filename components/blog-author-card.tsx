"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { User } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

interface BlogAuthorCardProps {
    name: string
    role?: string
    avatar?: string
    bio?: string
}

export function BlogAuthorCard({ name, role, avatar, bio }: BlogAuthorCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="border-2 border-foreground p-6 lg:p-8 my-12"
        >
            <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono text-[#ea580c] uppercase tracking-widest">// ABOUT_THE_AUTHOR</span>
                <div className="flex-1 border-t border-foreground/10" />
            </div>

            <div className="flex items-start gap-4 lg:gap-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-foreground bg-foreground/10 flex items-center justify-center shrink-0 overflow-hidden">
                    {avatar ? (
                        <Image
                            src={avatar}
                            alt={name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User size={28} className="text-muted-foreground" />
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <div>
                        <h3 className="text-sm font-mono font-bold uppercase">{name}</h3>
                        {role && (
                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                {role}
                            </span>
                        )}
                    </div>
                    <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                        {bio || `Member of the Nubis engineering team, building the cloud infrastructure Africa deserves.`}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
