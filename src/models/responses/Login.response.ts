interface LoginResponse {
    access_token?:           string;
    expires_in?:             string;
    refresh_expires_in?:     string;
    refresh_token?:          string;
    token_type?:             string;
    id_token?:               string;
    notBeforePolicy?:        string;
    session_state?:          string;
    scope?:                  string;
    error?:                  string;
    error_description?:      string;
};

export default LoginResponse;