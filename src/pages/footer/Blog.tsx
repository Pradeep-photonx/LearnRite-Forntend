import {  Box, Container, Stack, Typography, useMediaQuery } from "@mui/material"
import Layout from "../../layouts/Layout";
import blog_main from '../../assets/blog-main.png';
import blog_side from '../../assets/blog-side.jpg';

const Blog = () => {

    const is1024px =  useMediaQuery('(min-width:701px) and (max-width:1024px)');
    const is700px = useMediaQuery('(min-width:511px) and (max-width:700px)');
    const is550px = useMediaQuery('(max-width:550px)');


  return (
   <>
   <Layout>
    <Container maxWidth="lg" sx={{py:20}} >
        <Stack gap={'20px'} >
            <Typography variant="r32" fontFamily={'Vangeda'}  >TIMES OF INDIA</Typography>
            <Typography variant="m16" color="text.secondary" >Article on 27 Sept, 2014</Typography>
        </Stack>
        <Stack direction={ is1024px ? 'column' : is700px ? 'column' : is550px ? 'column' : 'row'} mt={'40px'} alignItems={is1024px ? 'center' : is700px ? 'center' : is550px ? 'center' : 'flex-start'  } gap={'40px'} >
            <img src={blog_main} alt=""  style={{width: is1024px ? '500px' : is700px ? '500px' : is550px ? '300px' : 'initial',height: is550px ? '300px' : '500px'}} />
            <Stack justifyContent={'space-between'} direction={is1024px ? 'row' : is700px ? 'column' : is550px ? 'column' : 'column'} gap={'40px'} >
                <Stack >
            <Typography variant="r20" fontFamily="Vangeda" sx={{position:'relative'}}>
    <span style={{ fontSize: '70px', color: '#E24600',position: 'absolute', top: '15px',left:is1024px ? '-13px' : is550px ? '-12px' : '-17px' }}>‘</span>
    Its better to spend a rupee more on a quality food product than spend lakh in the hospitals. 
    I could easily cut down the cost and increase my profit margin, by say, using vanaspati in my 
    sweets instead of pure ghee. But that is not who we are. That is not something we will ever do.
</Typography>
                </Stack>
            <Stack gap={'10px'}  alignSelf={is700px ? 'center' : is550px ? 'center' : 'flex-end'} >
                <img src={blog_side} height={'208px'} style={{width: is550px ? '250px' : '328px'}} alt="" />
                <Stack>
                    <Typography variant="r20" fontFamily="Vangeda" color='error.main' sx={{maxWidth:'150px'}} >CHAGARLAMUDI MADHU BABU</Typography>
                    <Typography variant="r16" color="text.secondary" fontStyle={'italic'} >Proprietor</Typography>
                    <Typography variant="m18" color="text.secondary"  >SWAGRUHA FOODS</Typography>
                </Stack>

            </Stack>

            </Stack>


        </Stack>
        <Box mt={'80px'} display={'flex'} flexDirection={'column'} gap={'30px'} >
            <Stack  >
                <Typography variant="r32" lineHeight={1} fontFamily="Vangeda">Foods</Typography>
                <Typography variant="r32" lineHeight={1} fontWeight={275} letterSpacing={'5%'} >THAT REMAIND</Typography>
                <Typography variant="r32" lineHeight={1} fontFamily="Vangeda">ONE OF HOME</Typography>

            </Stack>
            <Box display={'flex'} flexDirection={'column'} gap={'10px'} >
                <Typography variant="m16" color="text.secondary" >
                To say that Swagruha Foods had a humble beginning would be an understatement. Started with a capital of Rs. 5000, Swagruha Foods is one the best-known food chains in Andhra Pradesh today. Their dedication and encouragement from well-wishers made the impossible, possible. It all started about 26 years back when Mr.Prabhkar Reddy, the then district collector of Krishna district and MD of Vijayakrishna Super Bazaar, encouraged the parents of Madhu Babu to open a small traditional home foods stall. On 28th October 1990 they started Swagruha Foods in a small room in the house where they live. The workshop is still managed by Madhu Babu's mother, Vijayakumari whose brainchild was the business, and his father, Chagarlamudi Kishore, acknowledges her to be the backbone of the business.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                "From the second day onwards they did not have to look back. The legacy still continues with long queues outside the shop still being a common sight, especially during festivals," says Madhu Babu who runs the shop along with his family who owns the brand.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                When asked about the secret behind the unparalleled success, Madhu Babu's answer is simple, "A dedication to quality and taking the taste of homemade food to people. In fact, the name 'Swagruha' means own home and our products are a reflection of the same.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                "All the recipes are from my mother, who at the age of 65, and grandmother, who at the age of 90 is still working and continues to churn out new recipes," he adds.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                The whole family is so deeply rooted in the business that it is actually difficult to differentiate between the two entities.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                Probably it is because of this genuine love for the business that after finishing his engineering studies, instead of seeking a high-paying fancy job, Madhu Babu decided to take forward the family business and push it to new heights."I was ridiculed by many but in the end, my decision proved to be perfect. Because it is completely a family venture I don't have the pressure to strike a work-life balance. Yes, running the business is hectic but it is easier to deal with everything when you have the entire family working with you. Our love for the business equates with our love for our family each member of our family, including my wife Nirupama, my daughter Sesanka, and my son Nayan in some way the other contributes to the business. Even my son who is only in class 8th now has a certain connect with the business and there is a possibility of the fourth generation coming into the business," shares Madhu Babu.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                As far as personal life is concerned, while the father says the business is his only hobby, the son is a traveler at heart who loves to explore new places.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                Being a brand that gives women the highest respect in business, Swagruha Foods, as a part of its social responsibility is pro-active in upholding women empowerment. "Behind the success of Swagruha Foods are some iron-willed women and we whole-heartedly believe in empowering other women. Most of our employees in the workshop are women. Giving women financial independence is what we believe, the best way to empower them,"he asserts.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                Apart from employment creation, Swagruha Foods has also been instrumental in installing and maintaining a permanent drinking water plant in Government Hospital, Vijayawada under it's CSR activities.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                When it comes to employees, "Some of our staff are as old as the business itself. Our relationship with them is informal and they trust us more than anything. Our employees are our biggest catalyst to success," says Madhu Babu.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                Every success story has its fair share of challenges and the Swagruha Foods story is no different. Being famous always comes at a cost and in Swagruha Foods case it is the menace of others copying their brand to mimic the success story. Swagruha Foods concept has given life to many people in Andhra and Telangana. "There have been lawsuits regarding other lower quality brands trying to infringe on the copyright on our brand name 'Swagruha Foods'. However, people probably know by now who is original and that is why we continue to be everybody's favorite," he clarifies.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                "To be honest, the biggest challenge has been to keep the quality of our products intact and maintain the taste that people love Swagruha Foods for. A small change in raw material has a direct effect on the taste of our products, something that is difficult to control. The health our customers is of paramount importance and no compromise is made on that front. Our stock is always fresh and our pickles are free of any sort of preservatives. All our products in fact are chemical-free and organic. Maintaining the quality we are known for is a continuous challenge, but we strictly abide by it. Our reputation of 34 years is priceless to us and we would never do anything to jeopardize that," he shares.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                Although a penchant for quality makes the price of the products at a slightly higher level, in Madhu Babu's words, "It is better to spend a rupee more on a quality product than spending lakhs in hospitals. I could easily cut down the cost and increase my profit margin, by say, using vanaspati in my sweets instead of pure ghee. But that is not who we are. That is not something we will ever do."
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                Though Swagruha Foods as of now has a presence only in Vijayawada and Guntur, their fame has spread far and wide. As a result, patrons from other countries or Telugus who crave for food back home have found solace in our online ordering facility," says Madhu Babu, with a hint of pride in his voice.
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                While the traditional fare at 'Swagruha Foods such as their authentic Andhra sweets, pickles, and kaarampodulu, which has achieved a somewhat cult status in Vijayawada and Guntur, is their hallmark, the company plans to match up their game with time. "Traditional food has always been our strongest forte and will remain so, but in the future, we are planning to expand into package foods and fusion foods. Having said that, our motto remains to make the coming generation take pride in our rich culinary heritage.”
                </Typography>
                <Typography variant="m16" color="text.secondary" >
                His mantra for aspirant entrepreneurs is fairly simple and priceless, much like the sweets of‘Swagruha Foods, "Work hard and respect your roots. That is where the real strength comes from. We need to protect our culture for the coming generations.”
                </Typography>
            </Box>

        </Box>
    </Container>
   </Layout>
   </>
  )
}

export default Blog
