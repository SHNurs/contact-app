import {Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Contacts from './components/Contacts';
import CreateContact from './components/CreateContact';
import UpdateContact from './components/UpdateContact';
import { Layout } from 'antd';
import Favorites from './components/Favorites';


const { Content, Footer } = Layout;


function App() {
  return (
    <div className="App">
      <Layout>
        <Navbar />
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 720 }}>
            <Switch>
              <Route path='/update-contact/:id'>
                <UpdateContact />
              </Route>
              <Route path='/create-contact'>
                <CreateContact />
              </Route>
              <Route path={'/favorites'}>
                <Favorites />
              </Route>
              <Route path={'/'}>
                <Contacts />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Contacts App ©2021</Footer>
      </Layout>

    </div>
  );
}

export default App;
