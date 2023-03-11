import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor (
    private router: Router,
    private modal: NzModalService
  ) { }

  logout() {

    this.modal.confirm({
      nzTitle: '<b>ยืนยัน</b>',
      nzContent: 'ออกจากระบบ?',
      nzOnOk: () => {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    });

  }

}
