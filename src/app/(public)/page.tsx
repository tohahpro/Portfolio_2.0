import Hero from '@/components/modules/Home/Hero';
import MyAdvantage from '@/components/modules/Home/MyAdvantage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is the home page",
};
const HomePage = () => {
    return (
        
            <div className='max-w-svw mx-auto'>
                <Hero />
                <MyAdvantage />
            </div>
    );
};

export default HomePage;