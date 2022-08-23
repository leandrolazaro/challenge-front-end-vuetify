import { authenticationService } from "@/services/auth.service";

export function headersRequest() {
    const currentUser = authenticationService.currentUserValue || {};
    const authHeader = currentUser.token ? { 'Authorization': 'Bearer ' + currentUser.token } : {}
    return {
        headers: {
            ...authHeader,
            'Content-Type': 'application/json'
        }
    }
}