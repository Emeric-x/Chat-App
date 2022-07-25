import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsChatComponent } from './groups-chat.component';

describe('GroupsChatComponent', () => {
  let component: GroupsChatComponent;
  let fixture: ComponentFixture<GroupsChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
