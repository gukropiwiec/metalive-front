import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ComboComponent } from './pages/combo/combo.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { userGuard } from './guards/user.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'combos', component: ComboComponent },
    { path: 'perfil', component: PerfilComponent, canActivate: [userGuard] },
    { path: 'formulario', component: FormularioComponent},
];

