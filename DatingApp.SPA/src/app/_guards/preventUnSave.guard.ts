import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnSaveGuard implements CanDeactivate<MemberEditComponent> {

  canDeactivate(component: MemberEditComponent) {

      if (component.editForm.dirty) {
        return confirm('Czy na pewno opuić stronę. Wygląda na to, że nie dane był zmieniane i nie zostały zapisane ??');
      }

  }
}
