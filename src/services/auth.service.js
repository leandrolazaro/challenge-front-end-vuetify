import { BehaviorSubject } from 'rxjs';
import { authApi } from '@/api/auth.api';
import { handleResponse } from '@/helpers/handle-response';

// import config from '@/config';
// import { requestOptions } from '@/helpers/temp';
// import { handleResponse } from '@/helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function login(email, password, is_admin) {
    alert(JSON.stringify({ 'email': email, 'password': password, 'is_admin': is_admin }))
    authApi.login(
        { email: email, password: password, is_admin: is_admin },
        (user) => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        },
        (response) => {
            handleResponse(response);
        }
    );
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}