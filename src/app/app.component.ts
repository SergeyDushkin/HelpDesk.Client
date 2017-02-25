import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "./models/user";
import { UserService } from "./services/user.service";
import { Message } from "./models/message";
import { MessagesService } from "./services/messages.service";
import { AuthenticationService } from "./services/authentication.service";
import { SignalRService } from "./services/signalr.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  user: User;

  constructor(
    private router: Router,
    private _user_serv: UserService,
    private _msg_serv: MessagesService,
    private authenticationService: AuthenticationService
    //private signalRService: SignalRService
  ){

  }

  ngOnInit() {
    
    this.authenticationService.isAuthenticated.subscribe(
      isAuthenticated => {
        console.log('Authenticated: ' + isAuthenticated);

        if (isAuthenticated) {
          this._user_serv.getCurrentUser().subscribe(
            data => console.log('Profile service: load ' + data),
            err => console.log('Profile service: error ' + err),
            () => console.log('Profile service: done'),
          );
        }

        if (!isAuthenticated) {
          this._user_serv.clear();

          // not logged in so redirect to login page
          this.router.navigate(['/login']);
        }
      });

    //this.signalRService.messageReceived.subscribe(
    //  data => {
    //    // sending a test message
    //    this._msg_serv.addMessage(new Message( {
    //        author: 'Auto',
    //        content: JSON.stringify(data),
    //        destination: 'User',
    //        title: 'Publish message'
    //    }));
    //  },
    //  err => console.log('SignalR service: error ' + err),
    //  () => console.log('SignalR service: done'),
    //);


    //on envoi l'evenement resize, pour AdminLTE
    let ie = this.detectIE();
    if(!ie){
      window.dispatchEvent(new Event('resize'));
    }
    else{
      //solution for IE from @hakonamatata
      var event = document.createEvent("Event");
      event.initEvent("resize", false, true);
      window.dispatchEvent(event);
    }

    /*
    //envoi d'un message de test
    this._msg_serv.addMessage( new Message({
      title: "un message super important",
      content: "le contenu d'un message d'une importance extreme",
      author: user2,
      destination: user1
    }));
    */

  }

  detectIE(): any{
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …
    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
    // IE 12 / Spartan
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
    // Edge (IE 12+)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

}
