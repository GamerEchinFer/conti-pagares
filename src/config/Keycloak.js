import Keycloak from "keycloak-js";

const keycloak = typeof window !== 'undefined' ? new Keycloak({
    url: process.env.NEXT_PUBLIC_URL_KEYCLOAK,
    realm: 'internoKeycloack',
    clientId: process.env.NEXT_PUBLIC_CLIENTE_ID_KEYCLOAK,
}) : '';

export default keycloak;