import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityComponent } from './clarity.component';

describe('ClarityComponent', () => {
  let component: ClarityComponent;
  let fixture: ComponentFixture<ClarityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClarityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
