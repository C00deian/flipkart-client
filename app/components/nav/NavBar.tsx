
import { Redressed } from 'next/font/google'
import Container from '../Container'
import Link from 'next/link'
import { CartCount } from './CartCount';
import UserMenu from './UserMenu';
import Categories from './Categories';

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

function NavBar() {

    return (
        <div className='sticky
      top-0
      w-full
      bg-slate-200
      z-30
      shadow-sm
    '>
            <div className='py-4'>
                <Container>
                    <div className='flex items-center justify-between gap-3 md:gap-0'>

                        <Link className={`${redressed.className} font-bold text-2xl`} href={"/"}>E-shop</Link>

                        <div className='hidden md:block'>Search</div>
                        <div className='flex items-center gap-8 md:gap-8'>
                            <UserMenu />
                            <CartCount/>
                        </div>

                    </div>
                </Container>
            </div>
            <Categories/>
        </div>
    )
}

export default NavBar