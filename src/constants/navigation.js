import { FaHome } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { PiTelevisionSimple } from "react-icons/pi";
import { RiMovie2AiFill } from "react-icons/ri";


export const navigation = [
    {
        label: "TV Shows",
        href: 'tv',
        icon: <PiTelevisionSimple />
    },
    {
        label: "Movies",
        href: "movie",
        icon: <RiMovie2AiFill />
    }
]

export const MobileNavigation = [
    {
        label: "Home",
        href: "/",
        icon: <FaHome />
    },
    ...navigation,
    {
        label: "search",
        href: "/search",
        icon: <IoSearchOutline />
    }
]