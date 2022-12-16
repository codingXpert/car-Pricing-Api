import { 
    Controller,
    Post, 
    Body,
    UseGuards,
    Patch,
    Param
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorators';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
@Controller('reports')
export class ReportsController {
    constructor(private reportsService:ReportsService){}
    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)  // I want to serialize the out going response following the rules we setup inside ReportDto
    createReport(@Body() body: CreateReportDto , @CurrentUser() user:User){   // receiving Body as body & CurrentUser as user
       return this.reportsService.create(body , user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approvedReport(@Param('id') id : string , @Body() body : ApprovedReportDto){
         return this.reportsService.changeApproval(id , body.approved);
         
    }
}
