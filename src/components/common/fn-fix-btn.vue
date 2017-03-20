<template>
    <div>
        <ul class="fixedbtn" id="J_fixedBtn">
            <li class="search hide_it" id="J_newBtnSearch"></li>
            <li class="homepage hide_it" id="J_newBtnHomepage"></li>
            <li class="footprint hide_it" id="J_newBtnFootprint"></li>
            <li class="cart" id="J_newBtnCart" @click="btnCart">
                <b class="J_navCartNumId">
                {{cartNumber > 99 ? '99+' : cartNumber}}
            </b>
            </li>
            <li class="top" :class="classes" id="J_newBtnTop" @click="J_newBtnTop"></li>
        </ul>
    </div>
</template>
<style>
    .fixedbtn li b {
        width: auto;
        min-width: .36rem;
    }
</style>
<script>
    export default{
        props: {
            cartNumber: Number
        },
        data(){
            return {
                hide: true
            }
        },
        computed: {
            classes () {
                return {
                    'hide_it': this.hide
                }

            }
        },
        methods: {
            J_newBtnTop(){
                document.body.scrollTop = 0;
                return false;
            },
            btnCart(){
                window.location = 'http://m.beta1.fn/cart/';
            }
        },
        ready(){
            let me = this;
            window.addEventListener('scroll', function () {
                document.body.scrollTop >= 100 ? me.hide = false : me.hide = true
            })

        }
    }
</script>
