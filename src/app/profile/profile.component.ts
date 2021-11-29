import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../model/user.model';
import {BreakpointObserver} from '@angular/cdk/layout';
import {HttpClient, HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppointmentService} from '../services/appointmentservice';
import {ReminderService} from '../services/reminderservice';
import {NotificationService} from '../services/notificationservice';
import {UserService} from '../userService/user.service';
import {Notification} from '../model/notification';
import {DomSanitizer, SafeUrl, Title} from '@angular/platform-browser';
import {AuthenticationService} from '../services/authentication.service';
import {ImageService} from '../services/image.service';
import { createElement } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = 'Profile';

  userId: number;
  user: User;
  editDiv: boolean;
  progress: number;
  private currentFileUploaded: any;
  private selectedFile;
  private selectedFileUploaded: File=null;
  private timestimp: number=0;
  image:HTMLImageElement;
  imageData: any;
  sanitzedImageData: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  thumbnail: SafeUrl;
  progressShow: boolean;

  @ViewChild('labelImport', {static: false})
  labelImport: ElementRef;

  public path: Object = {
    saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
  };

  constructor(
    private observer: BreakpointObserver, public httpClient: HttpClient,
    private router: Router, private appointmentService: AppointmentService,
    private reminderService: ReminderService, private notificationService: NotificationService,
    private userService: UserService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService:AuthenticationService,
    private imageService: ImageService,
    private titleService:Title
  ) {this.userId = +localStorage.getItem('userId');}


  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.userService.searchByUserId(this.userId).subscribe((data:User) => {
      this.user = data;
      console.log(this.user);
    } );
    this.imageService.getImageFromBlob(this.userId);
    this.editDiv = false;
    this.progressShow = false;
  }

  /*getImageFromBlob(){
    this.http.get(this.userService.host+'photoProfile/'+this.userId+'?ts='+this.getTS(),
      {
        headers: new HttpHeaders({
          'Authorization': `${this.authService.getToken()}`,
          'Content-Type': 'image/png',
        }), responseType: 'blob'}
    ).subscribe(data => {
        console.log(data);
        this.createImageFromBlob(data);
      }
    );
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }*/


  editProfile(){this.editDiv = true;}

  saveChange() {
    this.userService.updateUser(this.user, this.userId).subscribe();
    this.editDiv = false;
  }

  onSelectedFile(event) {
    this.selectedFile = event.target.files;
    this.onFileChange(event.target.files);
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
        .map(f => f.name)
        .join(', ');
    this.selectedFileUploaded = files.item(0);

  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUploaded = this.selectedFile.item(0);
    this.userService.uploadPhotoProduct(this.currentFileUploaded, this.userId).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressShow = true;
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.timestimp = Date.now();
        this.progressShow = false;
      }
      this.imageService.getImageFromBlob(this.userId);
    })
  }
  public uploadEle: HTMLElement = createElement('label', { className: 'upload e-icons', innerHTML : 'Upload All' });
  public clearEle = createElement('label', { className: 'remove e-icons', innerHTML : 'Clear All' });
  public buttons: Object = {
    browse: 'Choose file',
    clear: this.clearEle,
    upload: this.uploadEle
  };



getTS() {
    return this.timestimp;
  }
}
