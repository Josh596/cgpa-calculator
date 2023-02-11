import React from 'react'
import { BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs'


function Icon({ icon, url }) {
    return (
        <a href={url} className='h-6 w-6'>{icon}</a>
    )
}

function Footer() {
    return (
        <footer className='text-center bg-gray-900 w-full py-3 text-white '>
            Built by @Josh596
            <div className='flex justify-center gap-3 mt-2'>
                <Icon icon={<BsTwitter size={18} />} url={'https://twitter.com/olujosh596'} />
                <Icon icon={<BsGithub size={18} />} url={'https://github.com/Josh596'} />
                <Icon icon={<BsLinkedin size={18} />} url={'https://www.linkedin.com/in/joshua-olukotun-a371761b2/'} />

            </div>
            <div>
                Source code for this project is available <a className='underline' target='_blank' rel="noreferrer" href='https://github.com/Josh596/cgpa-calculator'>here</a>.
            </div>
        </footer>
    )
}

export default Footer