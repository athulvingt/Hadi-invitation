import Hero from '../components/sections/Hero';
import Invitation from '../components/sections/Invitation';
import Events from '../components/sections/Events';
import Footer from '../components/sections/Footer';
import Divider from '../components/ui/Divider';

export default function Home(): React.JSX.Element {
  return (
    <main>
      <Hero />
      <Divider />
      <Invitation />
      <Divider />
      <Events />
      <Footer />
    </main>
  );
}
