<template>
    <transition :name="modalType == 'bottomsheet' ? 'mslide' : 'modal'">
        <div class="modal-mask" :class="modalType" @click="closeModal" ref="modal">
            <div class="modal-wrapper">
                <div class="modal-container" @click.stop>
                    <div v-if="showHeader" class="modal-header" :class="{'hideBorder': hideHeaderBorder}">
                        <slot name="header">
                            Header content
                        </slot>
                        <div v-if="showCloseBtn" class="modal-closeBtn" @click="$emit('close')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                <g fill="none" fill-rule="evenodd">
                                    <circle cx="15" cy="15" r="15" fill="#9197a3" opacity="1"/>
                                    <path fill="#FFF" d="M21 10.2L19.8 9 15 13.8 10.2 9 9 10.2l4.8 4.8L9 19.8l1.2 1.2 4.8-4.8 4.8 4.8 1.2-1.2-4.8-4.8z"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                    
                    <div class="modal-body">
                        <slot name="body">default body</slot>
                    </div>
                    <div v-if="showFooter" class="modal-footer">
                        <slot name="footer">
                            Footer content
                            <!-- <button class="modal-default-button" @click="$emit('close')">OK</button> -->
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        modalType: {
            type: String,
            default: "modal",
        },
        closeable: {
            type: Boolean,
            default: true,
        },
        blur: {
            type: Boolean,
            default: true,
        },
        showHeader: {
            type: Boolean,
            default: false,
        },
        hideHeaderBorder: {
            type: Boolean,
            default: false,
        },
        showFooter: {
            type: Boolean,
            default: false,
        },
        showCloseBtn: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    mounted() {
        if (this.blur) {
            this.$root.$el.classList.add("modal-blur");
            document.body.appendChild(this.$refs.modal);
            // document.body.classList.add("noScroll");
        }
    },
    deactivated() {
        this.$root.$el.classList.remove("modal-blur");
        document.body.classList.remove("noScroll");
    },
    destroyed() {
        this.$root.$el.classList.remove("modal-blur");
        document.body.classList.remove("noScroll");
    },
    methods: {
        closeModal() {
            if (this.closeable) {
                this.$emit("close");
            }
        },
    },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  -webkit-transition: opacity 0.3s ease;
  -moz-transition: opacity 0.3s ease;
  -o-transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80%;
  margin: 0px auto;
  padding: 0;
  background-color: #fff;
  border-radius: 10px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33); */
  box-shadow: 0 5.5px 7.5px 0 rgba(0, 0, 0, 0.2), 0 4.5px 23px 4px rgba(0, 0, 0, 0.12), 0 12px 19px 1.5px rgba(0, 0, 0, 0.14);
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  color: #000;
}

.modal-body {
  padding: 16px;
  min-height: 100px;
}

.modal-header, .modal-footer {
  padding: 12px;
}

.modal-header {
    text-align: left;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #ddd;
    font-weight: 700;
    color: #242424;
    width: 100%;
}
.modal-header.hideBorder {
    border-bottom: none !important;
}

.modal-footer {
    text-align: center;
    border-radius: 0 0 10px 10px;
    background-color: #283ec9;
    color: #fff;
}

.modal-closeBtn {
    float: right;
    position: relative;
    cursor: pointer;
    /* top: -12px; */
    /* right: -10px; */
    /* top: -54px;
    width: 10%; */
}
.bottomsheet .modal-container {
    width: 100%;
    position: fixed;
    bottom: 0;
    border-radius: 0;
}
.bottomsheet .modal-body {
    padding: 0
}
.bottomsheet .modal-footer {
    display: none;
}

/* Transition for modal */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  -ms-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
}

.mslide-enter {
  opacity: 0;
}

.mslide-leave-active {
  opacity: 0;
}

.mslide-enter .modal-container,
.mslide-leave-active .modal-container {
    -webkit-transform: translateY(200px);
    transform: translateY(200px);
    -ms-transform: translateY(200px);
    -moz-transform: translateY(200px);
    -o-transform: translateY(200px);
}


</style>
