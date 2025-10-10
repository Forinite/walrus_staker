import React from 'react'
import Header from "@/app/ui/Header";
import MainCard from "@/app/ui/MainCard";
import Lines from "@/app/ui/Lines";
import Credits from "@/app/ui/Credits";

const HeroPage = () => {
    return (
        <div  className={' h-screen overflow-hidden stroke-on-colored text-white'}>
            <Header />
            <MainCard />
            <Lines />
            <Credits />
        </div>
    )
}
export default HeroPage
