import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IDrugUsageCreate, IDrugUsage, IDrugUsageUpdate } from '../../../../core/@types/drug_usage';
import { DrugUsageService } from '../../servies/drug-usage.service';

@Component({
  selector: 'app-modal-drug-usage-new',
  templateUrl: './modal-drug-usage-new.component.html',
  styleUrls: ['./modal-drug-usage-new.component.css']
})
export class ModalDrugUsageNewComponent {

  validateForm!: UntypedFormGroup

  @Output() onSubmit = new EventEmitter<any>()

  isOkLoading = false
  isVisible = false
  code: any = ''

  constructor (
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private drugService: DrugUsageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      usage1: [null, [Validators.required]],
      usage2: [null, []],
      usage3: [null, []],
      code: [null, [Validators.required]],
    })
  }

  showModal(): void {
    this.validateForm.reset()
    this.validateForm.controls['code'].enable()
    this.code = null
    this.isVisible = true
  }

  showModalUpdate(usage: IDrugUsage): void {
    this.validateForm.reset()
    this.validateForm.controls['code'].disable()
    this.code = usage.code
    this.validateForm.patchValue({
      code: usage.code,
      usage1: usage.usage1,
      usage2: usage.usage2,
      usage3: usage.usage3,
    })
    this.isVisible = true
  }

  async doRegister(drug: IDrugUsageCreate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.drugService.save(drug)
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

  async doUpdate(drug: IDrugUsageUpdate) {
    this.isOkLoading = true
    const messageId = this.message.loading('กำลังบันทึกข้อมูล...', { nzDuration: 0 }).messageId
    try {
      await this.drugService.update(this.code, drug)
      this.message.remove(messageId)
      this.isOkLoading = false
      this.isVisible = false
      this.onSubmit.emit(true);
    } catch (error: any) {
      this.isOkLoading = false
      this.message.remove(messageId);
      this.message.error(`${error.code} - ${error.message}`);
    }
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      if (this.code) {
        let drug: IDrugUsageUpdate = {
          usage1: this.validateForm.value.usage1,
          usage2: this.validateForm.value.usage2,
          usage3: this.validateForm.value.usage3
        }

        this.doUpdate(drug)

      } else {
        let drug: IDrugUsageCreate = {
          code: this.validateForm.value.code,
          usage1: this.validateForm.value.usage1,
          usage2: this.validateForm.value.usage2,
          usage3: this.validateForm.value.usage3
        }

        this.doRegister(drug)

      }
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
    this.code = null
    this.isVisible = false
  }

}
