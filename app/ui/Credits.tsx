import React from 'react'
import {devLinks} from "@/app/constants/constants";

const Credits = () => {
    return (
        <div className={'absolute z-50 w-screen h-fit flex justify-center items-center bottom-4 font-inter font-light'}>
            <p>
                Built By&nbsp;
                <a href={devLinks[0].devLink} target="_blank" className="underline underline-offset-4">{devLinks[0].devName}</a>,
                &nbsp;<a href={devLinks[1].devLink} target="_blank" className="underline underline-offset-4">{devLinks[1].devName}</a>,
                and&nbsp;
                &nbsp;<a href={devLinks[2].devLink} target="_blank" className="underline underline-offset-4">{devLinks[2].devName}</a>.
            </p>
        </div>
    )
}
export default Credits
