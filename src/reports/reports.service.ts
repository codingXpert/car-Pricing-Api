import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';


@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo:Repository<Report> ){}
    
    
    create(reportDto : CreateReportDto , user:User){
        const report = this.repo.create(reportDto);
        report.user = user;  //associating or linking the user with reports

        // console.log(report);
        // console.log(report.user);
        
        return this.repo.save(report);    // when we call save on the reports behind the scenes , 
    }                                    //  the repository is going to extract just the user ID 
                                        //   from the entire instance , and it's going to save 
                                       //    that for us automatically inside the report table
}

