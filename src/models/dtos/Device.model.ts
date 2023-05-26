interface DeviceDto {
    acceso:                     string;
    sistemaOperativo:           string;
    navegador:                  string;
    versionSistemaOperativo:    string;
    versionNavegador:           string;
    ipDispositivo?:             string;
    dispositivo:                string;
    idDispositivo:              string;
    pais?:                      string;
    ciudad?:                    string;
    latitud?:                   string;
    longitud?:                  string;
}

export default DeviceDto;