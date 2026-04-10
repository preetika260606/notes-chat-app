import Images from "next/image";

export const Heroes =( )=> {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">

                    <Images src="/docu_light.png" fill
                    className="object-contain dark:hidden"
                    alt="Documents"/>

                    <Images src="/docu_dark.png" fill
                    className="object-contain hidden dark:block"
                    alt="Documents"/>
                    
                </div>
                <div className="relative h-[400px] w-[400px] hidden md:block">
                    <Images src="/reading_light.png" fill
                    className="object-contain dark:hidden"
                    alt="Reading"/>
                    <Images src="/reading_dark.png" fill
                    className="object-contain hidden dark:block"
                    alt="Reading"/>

                </div>
            </div> 
        </div>
    )
}