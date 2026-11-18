import Page from '../components/Page.jsx';
import { HomeHero } from '../components/home/FiveObjects.jsx';
import WorkList from '../components/home/WorkList.jsx';

/*
 * Home: the name and the line, both there on arrival; then the work, newest
 * first, as one list that stays easy to scan, with one drawing beside it
 * that becomes the object of whichever case is being read.
 */
export default function Home() {
  return (
    <Page className="cs-page home">
      <HomeHero />
      <WorkList />
    </Page>
  );
}
