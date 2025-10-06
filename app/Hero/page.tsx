import React from 'react'
import Header from "@/app/ui/Header";
import MainCard from "@/app/ui/MainCard";
import Lines from "@/app/ui/Lines";

const HeroPage = () => {
    return (
        <div  className={' h-screen stroke-on-colored text-white'}>
            <Header />
            <MainCard />
            {/*<Lines />*/}
        </div>
    )
}
export default HeroPage
