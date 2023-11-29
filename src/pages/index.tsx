import { NextPage } from 'next';
import { useAppDispatch } from '../redux/store';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { getIpGeolocation } from '../actions/Auth.actions';
import PromissoryNotesConsultPage from './promissoryNotes/consult';

interface props {
  resp: string,
}

const HomePage: NextPage<props> = () => {
  const dispatch = useAppDispatch();
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (keycloak?.tokenParsed?.preferred_username) {
      dispatch(getIpGeolocation());
    }
  }, []);

  return (
    <>
      <PromissoryNotesConsultPage />
    </>
  )
}

export default HomePage
