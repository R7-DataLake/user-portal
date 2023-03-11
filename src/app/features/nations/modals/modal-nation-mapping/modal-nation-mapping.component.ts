import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { INation, INationMapping } from '../../../../core/@types/nation';
import { NationService } from '../../services/nation.service';

@Component({
  selector: 'app-modal-nation-mapping',
  templateUrl: './modal-nation-mapping.component.html',
  styleUrls: ['./modal-nation-mapping.component.css']
})
export class ModalNationMappingComponent {

  validateForm!: UntypedFormGroup

  @Output() onSubmit = new EventEmitter<any>()

  isOkLoading = false
  isVisible = false
  code: any = ''
  name: any = ''
  f43: any = ''
  nhso: any = ''
  detail: any = ''

  constructor (
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private nationService: NationService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      f43: [null, [Validators.required]],
      nhso: [null, [Validators.required]],
      detail: [null, [Validators.required]],
    })
  }

  showModal(item: INation): void {

    this.validateForm.reset()
    this.code = item.code
    this.name = item.name

    this.detail = `${this.code} - ${this.name}`

    this.validateForm.patchValue({
      f43: item.f43,
      nhso: item.nhso,
      detail: this.detail
    })

    this.validateForm.controls['detail'].disable()

    this.isVisible = true
  }

  async doMapping(item: INationMapping) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.nationService.mapping(item)
      this.message.remove(messageId)
      this.isOkLoading = false
      this.isVisible = false
      this.onSubmit.emit(true)
    } catch (error: any) {
      this.isOkLoading = false
      this.message.remove(messageId)
      this.message.error(`${error.code} - ${error.message}`)
    }
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      let mapping: INationMapping = {
        code: this.code,
        f43: this.validateForm.value.f43,
        nhso: this.validateForm.value.nhso,
      }

      this.doMapping(mapping)
      return
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      });
      return
    }
  }

  handleCancel(): void {
    this.validateForm.reset()
    this.isOkLoading = false
    this.isVisible = false
  }
}
