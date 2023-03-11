import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IOccupation, IOccupationMapping } from '../../../../core/@types/occupation';
import { OccupationService } from '../../services/occupation.service';

@Component({
  selector: 'app-modal-occupation-mapping',
  templateUrl: './modal-occupation-mapping.component.html',
  styleUrls: ['./modal-occupation-mapping.component.css']
})
export class ModalOccupationMappingComponent {

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
    private occupationService: OccupationService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      f43: [null, [Validators.required]],
      nhso: [null, [Validators.required]],
      detail: [null, [Validators.required]],
    })
  }

  showModal(drug: IOccupation): void {

    this.validateForm.reset()
    this.code = drug.code
    this.name = drug.name

    this.detail = `${this.code} - ${this.name}`

    this.validateForm.patchValue({
      f43: drug.f43,
      nhso: drug.nhso,
      detail: this.detail
    })

    this.validateForm.controls['detail'].disable()

    this.isVisible = true
  }

  async doMapping(drug: IOccupationMapping) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.occupationService.mapping(drug)
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
      let mapping: IOccupationMapping = {
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
