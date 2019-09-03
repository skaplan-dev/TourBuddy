import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  GoogleOutline,
  LockOutline,
  UserOutline,
  SmileOutline,
  LogoutOutline,
  SyncOutline
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  UserOutline,
  SmileOutline,
  GoogleOutline,
  LockOutline,
  LogoutOutline,
  SyncOutline
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzEmptyModule,
    NzGridModule,
    NzDividerModule,
    NzMenuModule,
    NzIconModule,
    NzCollapseModule,
    NzInputModule,
    NzFormModule,
    NzTagModule,
    NzSpinModule,
    NzSelectModule,
    NzModalModule,
    NzDatePickerModule,
    NzUploadModule,
    NzMessageModule,
    NzTimelineModule,
    NzStatisticModule,
    NzTabsModule,
    NzLayoutModule,
    NzCheckboxModule,
    NzAffixModule,
    NzAvatarModule,
    NzDropDownModule,
    NzSwitchModule
  ],
  exports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzEmptyModule,
    NzGridModule,
    NzDividerModule,
    NzMenuModule,
    NzIconModule,
    NzCollapseModule,
    NzFormModule,
    NzTagModule,
    NzSpinModule,
    NzSelectModule,
    NzModalModule,
    NzDatePickerModule,
    NzUploadModule,
    NzMessageModule,
    NzTimelineModule,
    NzStatisticModule,
    NzTabsModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzAffixModule,
    NzAvatarModule,
    NzDropDownModule,
    NzSwitchModule
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class NzModule {}
