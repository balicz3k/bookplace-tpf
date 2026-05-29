# Firebase Auth (Email/Password)

## Konfiguracja w Firebase Console
1. Utworz projekt w Firebase.
2. Dodaj aplikacje webowa (ikona "</>") i skopiuj konfiguracje SDK.
3. Authentication -> Sign-in method -> Email/Password -> Enable.
4. (Opcjonalnie) Authentication -> Settings -> Authorized domains -> upewnij sie, ze jest localhost.

## Konfiguracja lokalna
1. Skopiuj `.env.example` do `.env` (plik jest juz utworzony).
2. Wpisz wartosci z konfiguracji SDK w `frontend/.env`.
3. Konfiguracja klienta jest w `frontend/src/database/client.ts` i eksportuje `databaseClinet`.

## TS2307: Cannot find module 'firebase/auth'
Ten blad oznacza, ze pakiet `firebase` nie jest zainstalowany w `frontend`.
Zainstaluj zaleznosc w katalogu `frontend`:
```
cd frontend
npm install firebase
```

## Role (opcjonalnie)
Role sa czytane z custom claims `roles` (tablica) lub `role` (string). Dodatkowo, jezeli email konczy sie na `@host.com`, uzytkownik dostaje role `HOST` (gdy brak claims). Logika jest w `frontend/src/contexts/auth/AuthContext.tsx`.

W Firebase Console nie da sie ustawic custom claims bezposrednio, wiec potrzebujesz:
- skryptu z Firebase Admin SDK (np. na backendzie), albo
- Cloud Function wywolywanej z poziomu admina.

Bez custom claims kazdy user dostaje role `USER`, a trasy hosta beda zablokowane.
