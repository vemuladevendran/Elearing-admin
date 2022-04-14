import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss']
})
export class ViewBooksComponent implements OnInit {
  @Output() closeViewBook = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  async shareData(): Promise<void> {
    try {
      const response = await fetch('/assets/video-default-thumbnail-img.webp');
      const blob = await response.blob();
      const filesArray = [
        new File(
          [blob],
          '/assets/video-default-thumbnail-img.webp',
          {
            type: "image/jpeg",
            lastModified: new Date().getTime()
          }
        )
      ];
      const shareData = {
        url: window.location.href,
        title: 'Course Details',
        text: "hi",
        files: filesArray,
      };
      navigator.share(shareData);
    } catch (error) {
      console.log(error);
    }
  }

  closeViewBookScreen(): void {
    this.closeViewBook.emit(false);
  }

}
