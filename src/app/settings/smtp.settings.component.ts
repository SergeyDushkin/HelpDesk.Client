import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { SmtpSettings } from './smtp.settings';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-smtp-settings',
  templateUrl: './smtp-settings.component.html',
  providers: [SettingsService] 
})

export class SmtpSettingsComponent implements OnInit {
  
  smtpSettings: SmtpSettings;
  
  constructor(private route: ActivatedRoute, private location: Location, private settingsService: SettingsService) { 
    this.smtpSettings = new SmtpSettings();
  }

  ngOnInit() {
    this.settingsService.getSmtpSetting().subscribe(
          (response) => this.smtpSettings = response,
          (err) => console.log("SMTP settings extract error " + err),
          () => console.log("SMTP settings extracted") );
  }

  onClickBack() {
      this.location.back();
  }

   onUpdate() {
      this.settingsService.putSmtpSetting(this.smtpSettings).toPromise(); 
      
      /*
      subscribe(
          (response) => (),
          (err) => console.log("SMTP settings save error " + err),
          () => console.log("SMTP settings saved"));

      */
  }
}
