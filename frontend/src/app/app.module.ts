import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { TabelaWishComponent } from './pages/components/tabela-wish/tabela-wish.component';
import { PrimeNGModuleModule } from './core/prime-ngmodule.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DialogChangeComponent } from './shared/components/dialog-change/dialog-change.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { HomeComponent } from './pages/components/home/home.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AuthInterceptor } from './auth/service/auth.interceptor';
import { AuthGuard } from './auth/guard/auth.guard';
import { AppConfigService } from './shared/components/utils/services/app-config.service';
import { BaseUrlInterceptor } from './shared/components/utils/interceptors/base-url.interceptor';
import { HttpErrorInterceptor } from './shared/components/utils/interceptors/http-error.interceptor';
registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TabelaWishComponent,
    DialogChangeComponent,
    SidebarComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    PrimeNGModuleModule,
    HttpClientModule,
    FormsModule,
    NgScrollbarModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    AppConfigService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
