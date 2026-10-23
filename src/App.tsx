import Header from './components/Header';
import Articles from './components/Articles';
import Footer from './components/Footer';

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-paper font-serif-body text-ink">
      <Header />
      <main>
        <Articles />
      </main>
      <Footer />
    </div>
  );
}
