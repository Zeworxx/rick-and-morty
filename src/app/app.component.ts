import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rick-and-morty';
  characters: any[] = [];
  currentPage = 1
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.listOfCharacters(this.currentPage)
  }

  public listOfCharacters(pagination: number): void {
    this.apollo
      .watchQuery({
        query: gql`
        query {
          characters(page: ${pagination}) {
            results {
              name
              image
            }
          }
        }
      `,
      })
      .valueChanges.subscribe((result: any) => {
        this.characters = result.data?.characters.results;
        console.log(this.characters)
      });
  }

  public nextPage(): void {
    this.listOfCharacters(this.currentPage++)
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.listOfCharacters(this.currentPage--)
    }
  }
}

