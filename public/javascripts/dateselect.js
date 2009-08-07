var DateSelector = Class.create({
  initialize:function(args)
  {
    this.prefix = args.prefix;
    this.elem = $(args.elem_id);
    this.span = args.span;
    this.callback = args.callback;

    this.dateObj = new Date();
    this.now_year = this.dateObj.getFullYear();
    this.now_month = this.dateObj.getMonth()+1;
    this.now_day = this.dateObj.getDate();
    var start_year = 0;
    var start_month= 0;
    var start_day = 0;
    if(args.start){
      if(typeof(args.start.getFullYear)=="undefined"){
        if(args.start.year)
          start_year = args.start.year
        if(args.start.month)
          start_month = args.start.month
        if(args.start.day)
          start_day = args.start.day
        this.firstDateObj = new Date(this.now_year+start_year,this.now_month-1+start_month,this.now_day+start_day); 
      }else{
        this.firstDateObj = args.start;
      }
    }else
    {
      this.firstDateObj = new Date(this.now_year,this.now_month-1,this.now_day); 
    }
    this.firstYear = this.firstDateObj.getFullYear();
    this.firstMonth = this.firstDateObj.getMonth()+1;
    this.firstDay = this.firstDateObj.getDate();

    var end_year = 0;
    var end_month= 0;
    var end_day = 0;

    if(args.end){
      if(args.end.year)
        end_year = args.end.year
      if(args.end.month)
        end_month = args.end.month
      if(args.end.day)
        end_day = args.end.day
    }
    this.lastDateObj = new Date(this.now_year+end_year,this.now_month-1+end_month,this.now_day+end_day);
    this.lastYear = this.lastDateObj.getFullYear();
    this.lastMonth = this.lastDateObj.getMonth()+1;
    this.lastDay = this.lastDateObj.getDate();

    if(args.default_day){
      this.defaultYear = args.default_day.getFullYear();
      this.defaultMonth = args.default_day.getMonth()+1;
      this.defaultDay = args.default_day.getDate();
    }else{
      this.defaultYear = this.lastYear;
      this.defaultMonth = this.lastMonth;
      this.defaultDay = this.lastDay;
    }
    this.setYearSelector();
  },
  validate:function(year,month,day)
  {
    var tmp = new Date(year,month-1,day);
    return month == (tmp.getMonth() + 1)
  },
  setYearSelector:function()
  {
    var nowValue = this.defaultYear;
    if(!this.year_elem)
    {
      this.year_elem = new Element('span',{id:this.prefix+'_year_span'});
      this.elem.appendChild(this.year_elem);
    }
    else
    {
      $(this.prefix+'_year').stopObserving('change');
      nowValue = this.getYear();
      if(this.lastYear < nowValue)
      {
        nowValue = this.lastYear;
      }else if(nowValue < this.firstYear)
      {
        nowValue = this.firstYear;
      }
    }
    var selectStr = '<select name="'+this.prefix+'_year" id="'+this.prefix+'_year">';
    for (var i=this.firstYear;i<=this.lastYear;i++)
    {
      var selected="";
      if(i == nowValue)
      {
          selected = 'selected="selected"';
      }
      selectStr += '<option value="'+i+'" ' + selected +'>'+i+'</option>';
    }
    selectStr+='</select>年';
    $(this.year_elem).innerHTML=selectStr;
    $(this.prefix+'_year').observe('change',this.setMonthSelector.bind(this));
    this.setMonthSelector();
  },
  setMonthSelector:function()
  {
    var nowValue = this.defaultMonth;
    if(!this.month_elem)
    {
      this.month_elem = new Element('span',{id:this.prefix+'_month_span'});
      this.elem.appendChild(this.month_elem);
    }
    else
    {
      $(this.prefix+'_month').stopObserving('change');
      nowValue = this.getMonth();
      if(this.lastYear <= this.getYear())
      {
        if(this.lastMonth < nowValue)
        {
          nowValue = this.lastMonth;
        }
      }else if(this.firstYear >= this.getYear())
      {
        if(nowValue < this.firstMonth)
        {
          nowValue = this.firstMonth;
        }
      }
    }
    var firstMonth = 1;
    var endMonth = 12;
    var nYear = this.getYear();
    if(nYear== this.firstYear)
    {
      firstMonth = this.firstMonth;
    }
    if(nYear == this.lastYear)
    {
      endMonth = this.lastMonth;
    }
    var selectStr = '<select name="'+this.prefix+'_month" id="'+this.prefix+'_month">';
    for (var i=firstMonth ;i<=endMonth;i++)
    {
      var selected="";
      if(i == nowValue)
      {
          selected = 'selected="selected"';
      }
      selectStr += '<option value="'+i+'" ' + selected + '>'+i+'</option>';
    }
    selectStr+='</select>月';
    $(this.month_elem).innerHTML=selectStr;
    $(this.prefix+'_month').observe('change',this.setDaySelector.bind(this));
    this.setDaySelector();
  },
  setDaySelector:function()
  {
    var nowValue = this.defaultDay;
    if(!this.day_elem)
    {
      this.day_elem = new Element('span',{id:this.prefix+'_day_span'});
      this.elem.appendChild(this.day_elem);
    }
    else
    {
      $(this.prefix+'_day').stopObserving('change');
      nowValue = this.getDay();
      if(this.getYear() >= this.lastYear && this.getMonth() >= this.lastMonth)
      {
        if(this.getDay() >= this.lastDay)
        {
          nowValue = this.lastDay;
        }
      }
      else if(this.getYear() <= this.firstYear && this.getMonth <= this.firstMonth)
      {
        if(this.getDay() <= this.firstDay)
        {
          nowValue = this.firstDay;
        }
      }
    }
    var selectStr = '<select name="'+this.prefix+'_day" id="'+this.prefix+'_day">';
    nYear = this.getYear();
    nMonth = this.getMonth();
    var firstDay = 1;
    var lastDay = 31;
    if(nYear == this.firstYear && nMonth == this.firstMonth)
    {
      firstDay = this.firstDay;
    }
    if(nYear == this.lastYear && nMonth == this.lastMonth)
    {
      lastDay = this.lastDay;
    }
    for (var i=firstDay ;i<=lastDay;i++)
    {
      if(!this.validate(nYear,nMonth,i))
      {
        break;
      }
      var selected="";
      if(i == nowValue)
      {
        selected = 'selected="selected"';
      }
      selectStr += '<option value="'+i+'" ' + selected + '>'+i+'</option>';
    }
    selectStr+='</select>日';
    $(this.day_elem).innerHTML=selectStr;
    $(this.prefix+'_day').observe('change',this.setDaySelector.bind(this));
    if(this.callback){ this.callback();}
  },
  getYear:function()
  {
    return parseInt($F(this.prefix+'_year'));
  },
  getMonth:function()
  {
    return parseInt($F(this.prefix+'_month'));
  },
  getDay:function()
  {
    return parseInt($F(this.prefix+'_day'));
  },
  getDate:function()
  {
    return new Date(this.getYear(),this.getMonth()-1,this.getDay());
  },
  changeLast:function(args)
  {
    this.lastDateObj = new Date(args.year,args.month-1,args.day);
    this.lastYear = this.lastDateObj.getFullYear();
    this.lastMonth = this.lastDateObj.getMonth()+1;
    this.lastDay = this.lastDateObj.getDate();
    this.setYearSelector();
  },
  changeFirst:function(args)
  {
    this.firstDateObj = new Date(args.year,args.month-1,args.day);
    this.firstYear = this.firstDateObj.getFullYear();
    this.firstMonth = this.firstDateObj.getMonth()+1;
    this.firstDay = this.firstDateObj.getDate();
    this.setYearSelector();
  }
});
var DateSpan = Class.create({
  initialize:function(args)
  {
    this.elem = $(args.id);
    this.start_elem_id = "start_"+args.id;
    this.end_elem_id = "end_"+args.id;
    this.elem.update("<span id='"+this.start_elem_id+"' ></span>～<span id='"+this.end_elem_id+"' ></span>");
    this.start_elem = $(this.start_elem_id);
    this.end_elem = $(this.end_elem_id);
    this.change_flg=false;
    this.startSelect = new DateSelector({prefix:this.start_elem_id,elem_id:this.start_elem_id,
      start:args.start,default_day:args.default_start_day,callback:this.change_start.bind(this)});
    this.endSelect = new DateSelector({prefix:this.end_elem_id,elem_id:this.end_elem_id,
      start:args.default_start_day,default_day:args.default_end_day,callback:this.change_end.bind(this)});
    this.change_flg=true;
  },
  change_start:function(){
    if(this.change_flg && this.startSelect && this.endSelect)
    {
      this.change_flg = false;
      this.endSelect.changeFirst({year:this.startSelect.getYear(),month:this.startSelect.getMonth(),day:this.startSelect.getDay()});
      this.change_flg = true;
    }
  },
  change_end: function(){
    if(this.change_flg && this.startSelect && this.endSelect)
    {
      this.change_flg = false;
      this.startSelect.changeLast({year:this.endSelect.getYear(),month:this.endSelect.getMonth(),day:this.endSelect.getDay()});
      this.change_flg = true;
    }
  },
  disable_field: function(){
    $(this.start_elem_id+"_year").disable();
    $(this.start_elem_id+"_month").disable();
    $(this.start_elem_id+"_day").disable();
    $(this.end_elem_id+"_year").disable();
    $(this.end_elem_id+"_month").disable();
    $(this.end_elem_id+"_day").disable();

  },
  enable_field: function(){
    $(this.start_elem_id+"_year").enable();
    $(this.start_elem_id+"_month").enable();
    $(this.start_elem_id+"_day").enable();
    $(this.end_elem_id+"_year").enable();
    $(this.end_elem_id+"_month").enable();
    $(this.end_elem_id+"_day").enable();
  }
});
